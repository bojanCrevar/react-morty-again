import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../model/storeModel";

const additionalStyle = { marginTop: "20px" };

export default function EditSkeleton({ count }: { count?: number }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Skeleton
      count={count ?? 1}
      baseColor={theme ? "#9ca3af" : "#ddd"}
      highlightColor="#fff"
      borderRadius="0.5rem"
      height={60}
      width={870}
      style={additionalStyle}
    />
  );
}
