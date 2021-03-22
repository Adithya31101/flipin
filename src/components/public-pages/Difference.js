import { ReactComponent as Tick } from '../../images/tick.svg';

const Difference = (props) => {
    return (
        <div className="marketing__section">
            <Tick />
            <h4>{props.title}</h4>
            <p>{props.children}</p>
        </div>
    );
}
export default Difference;
