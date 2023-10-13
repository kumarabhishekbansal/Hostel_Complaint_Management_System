import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Auth = (props) => {
  const {Component}=props;
    const navigate=useNavigate();
  const userstate = useSelector((state) => state.user);

  useEffect(()=>{
    if (!userstate || !userstate?.userInfo || !userstate?.userInfo?.role) {
      // console.log(userstate?.userInfo?.role);
      navigate("/dash");
    }
    // console.log(userstate?.userInfo?.role);
  },[userstate,navigate])

  return (<>
    <div>
      <Component />
    </div>
  </>)

};

export const Authorized = (props) => {
  const {Component}=props;
    const navigate=useNavigate();
    const userstate = useSelector((state) => state.user);

  useEffect(()=>{
    if (userstate || userstate?.userInfo || userstate?.userInfo?.role) {
      navigate("/dashboard");
    }
  },[userstate,navigate])

  return (<>
    <div>
      <Component />
    </div>
  </>)

};

export default Auth;
