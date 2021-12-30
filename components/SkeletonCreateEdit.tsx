import Wrapper from "./Wrapper";
import ReactPlaceholder from "react-placeholder";

export default function SkeletonCreateEdit({
  type = "media",
}: {
  type?: "media" | "rect" | "text" | "round" | "textRow" | undefined;
}) {
  return (
    <Wrapper title={""}>
      <div className={"mt-20"}>
        <ReactPlaceholder type={type} rows={7} ready={false}>
          <></>
        </ReactPlaceholder>
      </div>
    </Wrapper>
  );
}
