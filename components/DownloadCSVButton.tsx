import { getPriceFloat } from "lib/displayPrice";
import moment from "moment";
import { CSVLink } from "react-csv";

export default function DownloadCSVButton({ data, filename }) {
  if (!data) return null;
  return (
    <CSVLink
      data={data}
      filename={filename}
      target="_blank"
      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-OFLO_darkblue bg-OFLO_pastel hover:text-white hover:bg-OFLO_purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-OFLO_purple`}
    >
      Export Excel
    </CSVLink>
  );
}
