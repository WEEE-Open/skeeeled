import {
  Navbar,
  Nav,
  NavDropdown,
  Image,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { iconUser, iconLogout, iconAdmin } from "../icons.js";
import "./NavigationBar.css";

function NavigationBar(props) {
  return (
    <Navbar
      id={"navbar"}
      bg={props.dark ? "dark" : "light"}
      variant={props.dark ? "dark" : "light"}
    >
      <Link to={"/"}>
        <Navbar.Brand>
          <Image
            id={"navbar-logo-skeeelled"}
            src={
              props.dark
                ? "../img/logoSkeeelledDark.svg"
                : "../img/logoSkeeelledLight.svg"
            }
            className="logo"
          />
        </Navbar.Brand>
      </Link>

      {props.admin ? (
        <Link to="/admin/list">
          <Navbar.Brand>{iconAdmin} Admin panel </Navbar.Brand>
        </Link>
      ) : null}

      <Nav.Link as={Link} id={"course-link"} to="/courses">
        Courses
      </Nav.Link>

      <Nav.Link as={Link} id={"add-question-link"} to="/addquestion">
        Add question
      </Nav.Link>

      <Nav id={"user-dropdown"}>
        <Navbar.Collapse className="mr-4">
          <NavDropdown
            id="dropdown-menu-align-responsive-2"
            title={iconUser}
            align={{ lg: "end" }}
          >
            <Link to="/profile">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            </Link>
            <NavDropdown.Item href="#action/3.2">Bookmarks</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <Form.Switch
              label="Dark"
              id="custom-switch-dark"
              defaultChecked={props.dark}
              onChange={() => props.setdark(!props.dark)}
            />
            <Form.Switch
              label="Show hints"
              id="custom-switch-hint"
              defaultChecked={props.showhints}
              onChange={() => props.setshowhints(!props.showhints)}
            />
            <Form.Switch
              label="Show discussion"
              id="custom-switch-disc"
              defaultChecked={props.showdiscussion}
              onChange={() => props.setshowdiscussion(!props.showdiscussion)}
            />
            {props.logged && (
              <>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={props.logout}>
                  Logout {iconLogout}
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Navbar.Collapse>
      </Nav>

      {/* <Form.Switch label="Check this switch" type="switch" id="custom-switch"/> */}

      {/* <OverlayTrigger
				trigger="click"
				key="bottom"
				placement="bottom"
				overlay={
					<Popover id="popover-positioned-bottom">
					<Popover.Header as="h3">Popover bottom</Popover.Header>
					<Popover.Body>
						<strong>Holy guacamole!</strong> Check this info.
					</Popover.Body>
					</Popover>
				}
				>
				<Button variant="secondary">Popover on bottom</Button>
				</OverlayTrigger>
			*/}
    </Navbar>
  );
}

export default NavigationBar;
