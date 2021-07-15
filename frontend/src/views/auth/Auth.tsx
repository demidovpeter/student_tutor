import React from 'react';
import LoginForm from "../../components/Forms/LoginForm";
import BaseCard from "../../components/Forms/FormCard";
import RegisterForm from "../../components/Forms/RegisterForm";

function Auth() {
  /**
   * Login or register user route
   */

  const [loginView, setLoginView] = React.useState<boolean>(true)

  function handleViewChange() {
    setLoginView(!loginView)
  }

  return (
    <div>
      <BaseCard title={loginView? `Login`: `Sign In`}>
        {loginView?
          <LoginForm handleViewChange={handleViewChange}/>:
          <RegisterForm handleViewChange={handleViewChange}/>
        }
      </BaseCard>
    </div>
  )
}

export default Auth;