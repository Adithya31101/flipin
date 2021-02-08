import { Link } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <li className={props.className || undefined}>
            <Link to={props.to}>{props.text}</Link>
        </li>
    );
};

export default NavItem;
