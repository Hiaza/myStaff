const urlParams = new URLSearchParams(window.location.search);
let message = urlParams.get('message');
Promise.all([fetch("/templates/registration.mst").then(x => x.text())])
    .then((templateStr) => {
        const renderedHtmlStr = message ? Mustache.render(templateStr[0],{error:message})
                                        : Mustache.render(templateStr[0],{});
        const appEl = document.getElementById('app');
        console.log(renderedHtmlStr)
        appEl.innerHTML = renderedHtmlStr;
    })
    .catch(err => console.error(err));
    