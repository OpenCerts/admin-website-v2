import React, { FunctionComponent, useEffect, useState } from "react";

export const StorageAddress: FunctionComponent<{}> = () => {
  return (
    <div
      className={`container mx-auto py-2 relative flex items-center justify-between`}
    >
      <label className="block">
        <span className="text-gray-700">Name</span>
        <input type="text" placeholder="Default focus style" />
      </label>
    </div>
  );
};
