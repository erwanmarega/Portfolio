export const chase = {
  owner: 'hero',
  shark: null,
  controller: null,
  hero: null,
  layer: null,
  portal: null,
};

export function setChaseController(fn) {
  chase.controller = fn || null;
}

export function setChaseOwner(owner) {
  chase.owner = owner;
}

export function registerHero(api) {
  chase.hero = api;
}
