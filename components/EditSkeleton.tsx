import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const additionalStyle = { marginTop: "20px" };

export default function EditSkeleton({ count }: { count?: number }) {
  return (
    <Skeleton
      count={count ?? 1}
      baseColor="#ddd"
      highlightColor="#fff"
      borderRadius="0.5rem"
      height={60}
      width={870}
      style={additionalStyle}
    />
  );
}
