import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import CharacterList from "../../components/CharacterList";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import axios from "axios";
import SortComponent from "../../components/SortComponent";
import { useRouter } from "next/router";
import CharactersSkeleton from "../../components/skeletons/CharactersSkeleton";
import { GetServerSidePropsContext } from "next/types";
import { ResponseData } from "../../model/charactersModel";
import FilterPanel from "../../components/FilterPanel";
import { FilterGroupConfig } from "../../model/filterModel";
import { FilterModel } from "../../model/filterModel";
import FilterPanelMobile from "../../components/mobile/FilterPanelMobile";

function Characters() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [sort, setSort] = useState<string>("id");
  const [data, setData] = useState<ResponseData>({
    info: { count: 1, pages: 1 },
    results: [],
  });
  const { results: chars, info: pagesInfo } = data;

  function constructFilterQuery(filterObject: FilterModel) {
    let filterQuery = "";
    for (let key in filterObject) {
      let value = filterObject[key];
      value.forEach((val) => (filterQuery += `&filter.${key}[]=${val}`));
    }
    return filterQuery;
  }

  async function fetchData(filterObject?: FilterModel) {
    if (filterObject) {
      const response = await axios.get("/api/characters", {
        params: { activePage, keyword, sort, filterObject },
        paramsSerializer: (params) => {
          return `activePage=${params.activePage}&keyword=${
            params.keyword
          }${constructFilterQuery(params.filterObject)}`;
        },
      });
      setData(response.data);
    } else {
      const response = await axios.get("/api/characters", {
        params: { activePage, keyword, sort },
      });
      setData(response.data);
    }
  }

  useEffect(() => {
    fetchData();
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}&sort=${sort}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [activePage, keyword, sort]);

  const filterConfig: FilterGroupConfig[] = [
    {
      title: "Gender",
      values: ["Male", "Female", "Unknown"],
      type: "checkbox",
      key: "gender",
    },

    {
      title: "Status",
      values: ["Dead", "Alive", "Unknown"],
      type: "checkbox",
      key: "status",
    },
  ];

  return (
    <div className="flex mb-4 w-full flex-col lg:flex-row">
      <div className="w-1/4 lg:block hidden">
        <div className="w-1/2 ml-28 mt-44 ">
          <FilterPanel
            filterConfig={filterConfig}
            submitFilterHandler={fetchData}
          />
        </div>
      </div>

      <div className="w-4/4 p-4 lg:w-2/4 lg:p:0">
        <div>
          <h5 className="p-4 text-4xl	text-center">
            List of characters - {pagesInfo.count}
          </h5>
          <Pagination
            pagesInfo={pagesInfo}
            activePage={activePage}
            setActivePage={setActivePage}
          />
          <div>Pages: {pagesInfo.pages}</div>
          <Searchbar
            setKeyword={setKeyword}
            setActivePage={setActivePage}
            initKeyword={keyword}
          />
          <div className="pt-4 relative">
            <Link href="characters/create">
              <Button variant="success w-1/2" type="submit">
                Add character!
              </Button>
            </Link>
            <SortComponent setSort={setSort} initSort={sort} />
          </div>
          <div className="block lg:hidden mt-2">
            <FilterPanelMobile
              filterConfig={filterConfig}
              submitFilterHandler={fetchData}
            />
          </div>
          <div className="mt-8">
            {chars.length ? (
              <CharacterList characters={chars} fetchData={fetchData} />
            ) : (
              <CharactersSkeleton amount={10} />
            )}
          </div>
        </div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return { props: { query: query || null } };
}

export default Characters;
