import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type CharactersSkeletonProps = {
  amount: number;
};

export default function CharactersSkeleton(props: CharactersSkeletonProps) {
  function renderSkeletons(amount: number) {
    let skeletons = [];
    for (let i = 0; i < amount; i++) {
      skeletons.push(
        <div
          className="flex flex-row space-x-4 mt-4 border-2 bg-[#fff] dark:bg-gray-600"
          key={i}
        >
          <div className="w-1/6 h-36 ">
            <Skeleton height="95%" />
          </div>

          <div className="w-3/6 p-2">
            <Skeleton width="60%" count={4} />
          </div>
          <div className="w-2/6 flex flex-col text-right space-y-2 p-2 ">
            <div className="w-full h-8 ">
              <Skeleton height="100%" width="90%" count={3} />
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
