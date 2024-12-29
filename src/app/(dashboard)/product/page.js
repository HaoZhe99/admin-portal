"use client";
import { get, map } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingOverlay from "@/components/LoadingOverlay";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const product = await res.json();
        setProductList(product);
      } else {
        const error = await res.json();

        toast(error);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onClickDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/product?id=" + id, {
        method: "DELETE",
      });

      if (res.ok) {
        toast("Deleted successfully!");
      }
    } catch (error) {
      toast("Error creating product:", error);
    } finally {
      fetchProductData();
      setDeleteLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 border bg-white">
      <div className="flex justify-between items-end pb-4">
        <h1 className="text-2xl font-bold text-black">Product Listing</h1>

        <button className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded focus-visible:outline-none justify-self-center whitespace-nowrap bg-emerald-50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none">
          <a href="/product/create">Create</a>
        </button>
      </div>

      {loading ? (
        <LoadingOverlay loading={loading} />
      ) : (
        <div className="w-full overflow-x-auto">
          <table
            className="w-full text-left border border-separate rounded border-slate-200"
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  Statue
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  Action
                </th>
              </tr>
              {map(productList, (list, index) => {
                return (
                  <tr
                    key={index}
                    className="transition-colors duration-300 hover:bg-slate-50"
                  >
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {get(list, ["id"], "")}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {get(list, ["name"], "")}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {get(list, ["price"], "")}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {get(list, ["status"], "")}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      <Image
                        src={get(list, ["image"], "")}
                        width={100}
                        height={100}
                        alt="image"
                      />
                    </td>

                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      <button className="mr-4" title="Edit">
                        <Link href={`/product/${get(list, ["id"], "")}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 fill-blue-500 hover:fill-blue-700"
                            viewBox="0 0 348.882 348.882"
                          >
                            <path
                              d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                              data-original="#000000"
                            />
                            <path
                              d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                              data-original="#000000"
                            />
                          </svg>
                        </Link>
                      </button>
                      <button
                        className="mr-4"
                        title="Delete"
                        onClick={() => onClickDelete(get(list, ["id"], ""))}
                      >
                        {deleteLoading ? (
                          <LoadingOverlay loading={deleteLoading} />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 stroke-red-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
