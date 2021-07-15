import graphene
from graphene_django import DjangoObjectType
import graphql_jwt
from graphql_jwt.decorators import login_required, staff_member_required
from student.models import Profile, CustomUser

from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = '__all__'


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProfileMutation(graphene.Mutation):
    class Arguments:
        nickname = graphene.String()
        portrayed_as = graphene.String()
        id = graphene.ID()

    profile = graphene.Field(ProfileType)

    @classmethod
    @login_required
    def mutate(cls, root, info, nickname, portrayed_as, id):
        profile = Profile.objects.get(pk=id)
        """ Dont update if props have not been changed """
        if all([
            profile.nickname_prev == nickname,
            profile.portrayed_as_prev == portrayed_as
        ]):
            return ProfileMutation(profile=profile)

        """ Override previous data """
        profile.portrayed_as_prev = profile.portrayed_as
        profile.nickname_prev = profile.nickname
        """ Update fields """
        profile.portrayed_as = portrayed_as
        profile.nickname = nickname
        profile.status = 'pending'
        profile.submitted = True
        profile.save()

        return ProfileMutation(profile=profile)


class ProfileStatusMutation(graphene.Mutation):
    class Arguments:
        status = graphene.String(required=True)
        id = graphene.ID()

    profile = graphene.Field(ProfileType)

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, status, id):
        profile = Profile.objects.get(pk=id)
        profile.status = status.lower()
        profile.save()

        return ProfileMutation(profile=profile)


class Mutation(AuthMutation, graphene.ObjectType):
    """ Auth """
    token_auth = mutations.ObtainJSONWebToken.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    verify_token = mutations.VerifyToken.Field()
    """ Profile """
    update_profile = ProfileMutation.Field()
    update_profile_status = ProfileStatusMutation.Field()


class Query(UserQuery, MeQuery, graphene.ObjectType):
    all_profiles = graphene.List(ProfileType)
    all_students = graphene.List(CustomUserType)

    @staff_member_required
    def resolve_all_profiles(self, info):
        return Profile.objects.all()

    @staff_member_required
    def resolve_all_students(self, info):
        return CustomUser.objects.exclude(is_staff=True).all()


schema = graphene.Schema(query=Query, mutation=Mutation)
