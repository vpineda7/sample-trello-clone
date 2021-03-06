import { uuid } from '../commons'
import { tables } from '../db/schema'
import Base from './Base'

export default class Lists extends Base {
  constructor(db) {
    super(db)

    this.tableName = tables.LISTS
  }

  getAll(id_board) {
    return this.db.select()
      .from(this.table)
      .where(this.table.id_board.eq(id_board))
  }

  add({ id_board, name }) {
    const row = this.table.createRow({
      id_list: uuid(),
      id_board,
      name
    })

    return this.db.insertOrReplace().into(this.table).values([row]).exec()
  }
}
