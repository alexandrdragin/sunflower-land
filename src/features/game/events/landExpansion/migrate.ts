import Decimal from "decimal.js-light";
import cloneDeep from "lodash.clonedeep";
import { GameState } from "../../types/game";

export type LandExpansionMigrateAction = {
  type: "game.migrated";
};

type Options = {
  state: Readonly<GameState>;
  action: LandExpansionMigrateAction;
  createdAt?: number;
};

export function migrate({ state, action, createdAt = Date.now() }: Options) {
  const stateCopy = cloneDeep(state);
  const { skills, inventory } = stateCopy;
  const { farming, gathering } = skills;

  const hasEnoughXP = farming.add(gathering).gte(new Decimal(10000));
  const isWarrior = inventory.Warrior?.gte(1);
  const isMod = inventory["Discord Mod"]?.gte(1);

  if (!isWarrior && !hasEnoughXP && !isMod) {
    throw new Error("You don't meet the requirements for migrating");
  }
}
