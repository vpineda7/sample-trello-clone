import ShadowElement from './ShadowElement'

class Boards extends ShadowElement {
  constructor() {
    super()

    this.$ = {
      db: null
    }

    this.boards = []

    this._init = this._init.bind(this)
    this.render = this.render.bind(this)
    this.updateBoards = this.updateBoards.bind(this)
  }

  get query() {
    if (!this.$.db) {
      this.$.db = document.querySelector('trello-clone').db
    }

    return this.$.db
  }

  connectedCallback() {
    this.query.addEventListener(this.query.events.INITIALIZED, this._init)
  }

  _init() {
    this.query.observeBoards(this.updateBoards)

    this.query.fetchBoards()
      .then(results => {
        this.boards = results

        this.render()
      })

    this.query.removeEventListener(this.query.events.INITIALIZED, this._init)
  }

  disconnectedCallback() {
    this.query.unobserveBoards(this.updateBoards)
  }

  updateBoards(changes) {
    changes.forEach(change => {
      this.boards = change.object
    })

    this.render()
  }

  render() {
    this.update(`
      <link rel="stylesheet" href="/styles/components/Boards.css">

      <section class="boards container">
        <h1>Boards</h1>

        <main>
          <ul class="list row">
            ${this.boards.map(board => `
              <li class="item col-xs-12 col-md-3">
                <div class="board">
                  <p class="board__name js-board__name">
                    ${board.name}
                  </p>
                </div>
              </li>
            `)}
          </ul>
        </main>
      </section>
    `)
  }
}

window.customElements.define('tc-boards', Boards)
