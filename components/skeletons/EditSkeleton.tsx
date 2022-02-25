import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../model/storeModel";

const additionalStyle = { marginTop: "20px" };

export default function EditSkeleton({ count }: { count?: number }) {
  const isDarkTheme = useSelector(
    (state: RootState) => state.profile.isDarkTheme
  );
  return (
    <Skeleton
      count={count ?? 1}
      baseColor={isDarkTheme ? "#9ca3af" : "#ddd"}
      highlightColor="#fff"
      borderRadius="0.5rem"
      height={60}
      width={870}
      style={additionalStyle}
    />
  );
}
