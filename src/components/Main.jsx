import AddContainer from "./AddContainer";
import Graph from "./Graph";
import TotalMenu from "./TotalMenu";

export default function Main(props) {
  const { openModal, cards } = props;
  return (
    <div className="main">
      <AddContainer {...props} />
      <Graph />
      <TotalMenu {...props} />
    </div>
  );
}
