import React, { useEffect } from "react";
import { verifyEmail } from "../../helpers/fakebackend_helper";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  document.title = "Verifyinig Email";

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verifyEmail({ token }).then((res) => {
        console.log(
          "ACCESS TOKEN FOR VERIFYING EMAIL ->",
          res.data.accessToken
        );

        localStorage.setItem("authUser", JSON.stringify(res.data));
        localStorage.setItem(
          "access_token",
          JSON.stringify(res.data.accessToken)
        );
        sessionStorage.setItem("authUser", JSON.stringify(res.data));
        sessionStorage.setItem(
          "access_token",
          JSON.stringify(res.data.accessToken)
        );
        navigate("/connect-website");
      });
    }
  }, []);

  return (
    <div style={{ color: "black" }}>
      <h3>Email verified redirecting to homepage ...</h3>
    </div>
  );
};

export default VerifyEmail;
