import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function EditEpisodeSkeleton() {
  return (
    <Skeleton
      count={3}
      baseColor="#ddd"
      highlightColor="#fff"
      borderRadius="0.5rem"
      height={60}
      width={870}
    />
  );
}
