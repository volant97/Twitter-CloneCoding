import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../style/icon/HomeIcon";
import UserIcon from "../style/icon/UserIcon";
import ArrowLeftIcon from "../style/icon/ArrowLeftIcon";
import { auth } from "../firebase";

function Layout() {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");

    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <StWrapper>
      <StMenu>
        <StMenuItem>
          <Link to="/">
            <HomeIcon />
          </Link>
        </StMenuItem>
        <StMenuItem>
          <Link to="/profile">
            <UserIcon />
          </Link>
        </StMenuItem>
        <StMenuItem className="log-out" onClick={onLogOut}>
          <ArrowLeftIcon />
        </StMenuItem>
      </StMenu>
      <Outlet />
    </StWrapper>
  );
}

export default Layout;

const StWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0;
  width: 100%;
  height: 100%;
  max-width: 860px;
`;

const StMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;

  svg {
    width: 30px;
    fill: white;
  }

  &.log-out {
    border-color: tomato;

    svg {
      fill: tomato;
    }
  }
`;
