import { UUID } from "../../../../types/bklog";

export interface BklogState {
  pageId: UUID | null;
  userId: string | null;
}

export const RESET_BLOCK = 'bklog/RESET_BLOCK' as const;