import { ReactElement, useState } from "react";
import {
  CgChevronLeft,
  CgChevronRight,
  CgPushChevronLeft,
  CgPushChevronRight,
} from "react-icons/cg";
// USAGE
//   <Table
//   data={data?.orders}
//   onRowClick={(row) => router.push("archives/" + row?.id)}
//   columns={[
//     { value: "Reference", key: "reference" },
//     { value: "Date", key: "date" },
//     { value: "CIP", key: "cip" },
//     { value: "Pharmacie", key: "pharmacy" },
//     { value: "Status", key: "status" },
//   ]}
//   renderProperty={{
//     date: (order) => (
//       <>{moment(new Date(order.createdAt)).format("lll")}</>
//     ),
//     status: (order) => (
//       <StatusText status={order?.status}></StatusText>
//     ),
//     pharmacy: (order) => <>{order?.pharmacy?.name}</>,
//   }}
// />
interface Column {
  value: string;
  key: string;
}

interface Pagination {
  page: number;
  display: number;
  count: number;
}

type TableProps = {
  data: Array<any>;
  columns: Array<Column>;
  pagination?: Pagination;
  renderProperty?: { [key: string]: (row: any) => ReactElement };
  thead?: ReactElement;
  tfoot?: Array<ReactElement>;
  title?: string;
  onRowClick?: (row: any) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onPageSet?: (page: number) => void;
  onDisplaySet?: (num: number) => void;
  loading?: any;
  emptyText?: string;
};

export const Table = ({
  data,
  columns,
  renderProperty,
  pagination,
  title,
  thead,
  tfoot,
  onRowClick,
  onNextPage,
  onPrevPage,
  onPageSet,
  onDisplaySet,
  loading = "Chargement...",
  emptyText = "Aucune donnée",
}: TableProps) => {
  if (
    pagination &&
    pagination?.page > 1 &&
    pagination?.page > Math.ceil(pagination?.count / pagination?.display)
  )
    onPageSet && onPageSet(1);
  return (
    <div className="inline-block min-w-full py-2 align-middle">
      {thead && thead}
      <table className="relative w-full border-separate">
        {!thead && (
          <thead>
            <tr>
              {columns &&
                columns?.map((col, index) => {
                  return (
                    <th
                      key={index}
                      className={`px-4 py-3 text-xs font-light text-left  uppercase border-t border-b sticky top-14 bg-white`}
                    >
                      {col?.value}
                    </th>
                  );
                })}
            </tr>
          </thead>
        )}
        <tbody>
          {!data ? (
            <tr className="px-6 py-4 text-sm">
              <td>{loading}</td>
            </tr>
          ) : data?.length === 0 ? (
            <tr className="px-6 py-4 text-sm ">
              <td>{emptyText}</td>
            </tr>
          ) : (
            data?.map &&
            data?.map((row, index) => {
              if (!row) return null;
              return (
                <tr
                  key={row?.id || index}
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    onRowClick && onRowClick(row);
                  }}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {columns &&
                    columns?.map((col) => {
                      if (!col) return null;
                      return (
                        <td key={col?.key} className="whitespace-no-wrap">
                          {renderProperty && renderProperty[col?.key]
                            ? renderProperty[col?.key](row)
                            : row[col?.key]}
                        </td>
                      );
                    })}
                </tr>
              );
            })
          )}
        </tbody>
        {tfoot && (
          <tfoot className="pt-2">
            <tr className="pt-2 ">{tfoot?.map((row, index) => row)}</tr>
          </tfoot>
        )}
      </table>
      {pagination && (
        <div className="flex justify-end w-full px-6 text-sm">
          <div className="flex items-center justify-center px-10">
            <p className="pr-4 text-xs">{title} par page</p>
            <select
              className="text-sm "
              defaultValue={pagination?.display || "20"}
              onChange={(e) => {
                e.preventDefault();
                if (onDisplaySet) onDisplaySet(parseInt(e?.target?.value));
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <p className="pl-4 text-xs">
              {(pagination?.page - 1) * pagination?.display + 1} -{" "}
              {pagination?.display * pagination?.page > pagination?.count
                ? pagination?.count
                : pagination?.display * pagination?.page}{" "}
              sur {pagination?.count} {title}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`px-1 border rounded-md ${
                pagination?.page > 1 ? "cursor-pointer " : "cursor-not-allowed"
              }`}
              onClick={() => {
                onPageSet && onPageSet(1);
              }}
            >
              <CgPushChevronLeft className="" size={20} />
            </div>
            <div
              className={`px-1 border  rounded-md ${
                pagination?.page > 1 ? "cursor-pointer " : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (pagination?.page > 1) onPrevPage && onPrevPage();
              }}
            >
              <CgChevronLeft className="" size={20} />
            </div>
            <div className="flex items-center justify-center px-4 ">
              <input
                className="h-5 px-1"
                value={pagination?.page}
                min={1}
                max={Math.ceil(pagination?.count / pagination?.display)}
                onChange={(e) => {
                  e.preventDefault();
                  onPageSet && onPageSet(parseInt(e.target.value));
                }}
                type="number"
                step={1}
              ></input>
              <p className="px-1">/</p>
              <p>{Math.ceil(pagination?.count / pagination?.display)}</p>
            </div>
            <div
              className={`px-1 border rounded-md ${
                pagination?.page <
                Math.ceil(pagination?.count / pagination?.display)
                  ? "cursor-pointer "
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (
                  pagination?.page <
                  Math.ceil(pagination?.count / pagination?.display)
                )
                  onNextPage && onNextPage();
              }}
            >
              <CgChevronRight className="" size={20} />
            </div>
            <div
              className={`px-1 border  rounded-md ${
                pagination?.page <
                Math.ceil(pagination?.count / pagination?.display)
                  ? "cursor-pointer "
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                onPageSet &&
                  onPageSet(Math.ceil(pagination?.count / pagination?.display));
              }}
            >
              <CgPushChevronRight className="" size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
