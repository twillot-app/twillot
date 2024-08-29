import { TaskType } from 'utils/types'
import { ProductName } from 'utils/types/product'

/**
 * NOTE 避免多个扩展之间事件冲突
 */
export enum ProductTaskType {
  CreateBookmark = TaskType.CreateBookmark +
    '_' +
    ProductName.BookmarkAutomation,
}
