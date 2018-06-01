const appendLinkToValue = item => {
  // add link where appropriate
  return item.Rows.map(row =>
    Object.assign(row, { isLink: row.Value.indexOf("_") >= 0 })
  );
};

export const prepareArtefactsData = artefacts => {
  // Flatten all data nodes
  return Promise.all(artefacts.Data.map(item => appendLinkToValue(item)))
    .then(() => {
      return [...artefacts.Data, ...artefacts.Pedia, ...artefacts.Text];
    })
    .catch(reason => reason);
};
