import Account from "./Account";

function Login({ onLogin, isLoading, isSuccess }) {
  
  return (
    <Account
      name="login"
      title="Вход"
      textOnButton={isLoading ? 'Осуществляется вход...' : 'Войти'}
      onSubmit={onLogin}
      withText={false}
      isSuccess={isSuccess}
    />    
  );
}

export default Login;