function akaStoriesOnClick() {
    $.alert({
        title: 'Story',
        content: 'Hello',
        buttons: {
            close: {
                text: 'Tutup',
                keys: ['esc']
            }
        }
    })
}