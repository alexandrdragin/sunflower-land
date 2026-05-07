import React, { useState } from "react";
import classNames from "classnames";

import powerup from "assets/icons/level_up.png";
import { Box } from "components/ui/Box";
import { Label } from "components/ui/Label";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const MAX_AGING_SHED_RACK_SLOTS = 6;

export const EmptyAgingShedRackSlot: React.FC<{
  isInactive?: boolean;
  isLocked?: boolean;
  lockedTooltip?: string;
}> = ({ isInactive, isLocked, lockedTooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center max-w-[72px]"
      onMouseEnter={() => isLocked && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={classNames((isInactive || isLocked) && "opacity-40")}>
        <Box hideCount disabled={!isLocked}>
          <div className="relative w-full h-full border border-dashed border-[#181425]/35 opacity-60 rounded-sm" />
        </Box>
      </div>
      {isLocked && (
        <img
          src={powerup}
          alt="Upgrade Aging Shed"
          className="absolute pointer-events-none"
          style={{
            width: `${PIXEL_SCALE * 5}px`,
            right: `${PIXEL_SCALE * 5}px`,
            bottom: `${PIXEL_SCALE * 5}px`,
          }}
        />
      )}
      {isLocked && showTooltip && lockedTooltip && (
        <Label
          type="default"
          className="absolute z-20 text-xxs whitespace-nowrap pointer-events-none"
          style={{
            left: `${PIXEL_SCALE}px`,
            bottom: `${PIXEL_SCALE * -7}px`,
          }}
        >
          {lockedTooltip}
        </Label>
      )}
    </div>
  );
};
