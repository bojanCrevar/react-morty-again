import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "../characters/CharCard.module.css";
type CharactersSkeletonProps = {
  amount: number;
};

export default function CharactersSkeleton(props: CharactersSkeletonProps) {
  function renderSkeletons(amount: number) {
    let skeletons = [];
    for (let i = 0; i < amount; i++) {
      skeletons.push(
        <div
          className="bg-[#fff] dark:bg-[#555e68] rounded first:mt-2 mb-2 p-2 flex flex-col sm:flex-row"
          key={i}
        >
          <div className="flex space-x-4 w-full">
            <div className="w-1/2 sm:w-1/3 lg:w-1/4 h-36 relative">
              <Skeleton height="95%" />
            </div>

            <div className="pt-4 text-sm md:text-base w-full ">
              <Skeleton width="80%" count={4} />
            </div>
          </div>
          <div
            className={`w-full sm:w-1/4 md:w-2/4 mt-2 space-x-4 sm:space-x-0 sm:space-y-2 flex ${styles.button}`}
          >
            <div className="w-1/3 sm:w-full ">
              <Skeleton height="100%" width="90%" count={1} />
            </div>
            <div className="w-1/3 sm:w-full ">
              <Skeleton height="100%" width="90%" count={1} />
            </div>
            <div className="w-1/3 sm:w-full ">
              <Skeleton height="100%" width="90%" count={1} />
            </div>
          </div>
        </div>
      );
    }
    return skeletons;
  }

  const displaySkeletons = renderSkeletons(props.amount);

  return (
    <SkeletonTheme
      baseColor="#a6a6a6"
      highlightColor="#c2c2c2"
      borderRadius="1"
      duration={1}
    >
      {displaySkeletons}
    </SkeletonTheme>
  );
}
