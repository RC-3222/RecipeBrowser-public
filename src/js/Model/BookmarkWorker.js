export default class BookmarkWorker {
    constructor(parent) {
        this.parent = parent;
        this.key = 'recBrBookmarks'
        const previousStorage = localStorage.getItem(this.key);
        this.bookmarks = previousStorage ? JSON.parse(previousStorage) : []
    }

    addBookmark(id, title) {
        this.bookmarks.push({id, title})

        localStorage.setItem(this.key, JSON.stringify(this.bookmarks));

        this.parent.view.wpView.updateBookmarks(this.bookmarks)
    }

    deleteBookmark(id) {
        this.bookmarks = this.bookmarks.filter((deletedItem) => deletedItem.id !== id)

        if (this.bookmarks.length === 0)
            localStorage.removeItem(this.key);
        else
            localStorage.setItem(this.key, JSON.stringify(this.bookmarks));

        this.parent.view.wpView.updateBookmarks(this.bookmarks)
    }

    isRecipeBookmarked() {
        return this.bookmarks.some((bookmark) => bookmark.id === this.parent.wpModel.activeRecipeInfo.id)
    }
}