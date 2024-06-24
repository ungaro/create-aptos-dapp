import { Link, useNavigate } from "react-router-dom";
// Internal components
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// Internal hooks
import { useGetAssetMetadata } from "@/hooks/useGetAssetMetadata";

export function MyFungibleAssets() {
  const fas = useGetAssetMetadata();

  // If we are on Production mode, redierct to the public mint page
  const navigate = useNavigate();
  if (import.meta.env.PROD) navigate("/", { replace: true });

  return (
    <>
      <LaunchpadHeader title="My Assets" />
      <Table className="max-w-screen-xl mx-auto">
        {!fas.length && <TableCaption>A list of the fungible assets created under the current contract.</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Symbol</TableHead>
            <TableHead>Asset Name</TableHead>
            <TableHead>FA address</TableHead>
            <TableHead>Max Supply</TableHead>
            <TableHead>Minted</TableHead>
            <TableHead>Decimal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fas.length > 0 &&
            fas.map((fa: any) => {
              return (
                <TableRow key={fa.asset_type}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <img src={fa.icon_uri} style={{ width: "40px" }} className="mr-2"></img>
                      <span>{fa.symbol}</span>
                    </div>
                  </TableCell>
                  <TableCell>{fa.name}</TableCell>
                  <TableCell>
                    <Link
                      to={`https://explorer.aptoslabs.com/object/${
                        fa.asset_type
                      }?network=${import.meta.env.VITE_APP_NETWORK}`}
                      target="_blank"
                      style={{ textDecoration: "underline" }}
                    >
                      {fa.asset_type}
                    </Link>
                  </TableCell>
                  <TableCell>{fa.maximum_v2}</TableCell>
                  <TableCell>{fa.supply_v2}</TableCell>
                  <TableCell>{fa.decimals}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
