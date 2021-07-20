export function extractId(entity: {id: string}, _index: number) {
  return entity.id;
}

export function extractIndex(_: any, index: number) {
  return index.toString();
}
