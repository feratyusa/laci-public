import React from "react";
import { Link } from "@inertiajs/react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export default function Pagination({paginator}) {
 
  return (
    <div className="flex items-center gap-8">
      <Link href={paginator['prev_page_url']} 
        as="button" 
        disabled={paginator['current_page'] === 1}>
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Link>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{paginator['current_page']}</strong> of{" "}
        <strong className="text-gray-900">{paginator['last_page']}</strong>
      </Typography>
      <Link href={paginator['next_page_url']}
            as="button"
            disabled={paginator['current_page'] === paginator['last_page']}
      >
        {/* <IconButton
          size="sm"
          variant="text"          
          disabled={paginator['current_page'] === paginator['last_page']}
        > */}
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        {/* </IconButton> */}
      </Link>
    </div>
  );
}