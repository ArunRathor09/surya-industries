// TODO: Replace stock imagery with approved SPI photos in /public/services/<slug>.jpg.
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=82`;

export const serviceImages: Record<string, string> = {
  "earthing-electrode": unsplash("photo-1473341304170-971dccb5ac1e"),
  "earthing-pit-cover": unsplash("photo-1497440001374-f26997328c1b"),
  "ese-lightning-arresters": "/products/ese-lightning-arrester-placeholder.svg",
  "back-fill-compounds": unsplash("photo-1500382017468-9049fed747ef"),
  "earthing-strip": unsplash("photo-1565514020179-026b92b84bb6"),
  "wires-and-cables": unsplash("photo-1518770660439-4636190af475"),
  "copper-bonded-rods": unsplash("photo-1565514020179-026b92b84bb6"),
  "copper-grounding-rods": unsplash("photo-1565514020179-026b92b84bb6"),
  "industrial-clamp": unsplash("photo-1581092160562-40aa08e78837"),
  "household-and-industrial-frlsh-cables-is-694-2010": unsplash(
    "photo-1518770660439-4636190af475",
  ),
  "house-hold-cable-is-694-2010": unsplash("photo-1518770660439-4636190af475"),
  "true-power-multicore-cable-is-694-2010": unsplash(
    "photo-1565514020179-026b92b84bb6",
  ),
  "aerial-bunched-cable-is-14255": unsplash("photo-1473341304170-971dccb5ac1e"),
  "solar-cable-is-17293-2020": unsplash("photo-1518770660439-4636190af475"),
  "acsr-conductors-is-398-ii": unsplash("photo-1473341304170-971dccb5ac1e"),
  "solar-mounting-structures": unsplash("photo-1508514177221-188b1cf16e9d"),
  "solar-inverters": unsplash("photo-1497440001374-f26997328c1b"),
  "solar-dc-cables-and-ac-cables": unsplash("photo-1518770660439-4636190af475"),
  "solar-connectors": unsplash("photo-1518770660439-4636190af475"),
  "combiner-boxes": unsplash("photo-1497440001374-f26997328c1b"),
  "solar-charge-controllers": unsplash("photo-1497440001374-f26997328c1b"),
  "surge-protectors-and-disconnect-switches": unsplash(
    "photo-1581092160562-40aa08e78837",
  ),
  "energy-meters-and-monitoring-devices": unsplash("photo-1518770660439-4636190af475"),
  "solar-earthing-and-grounding-systems": unsplash(
    "photo-1508514177221-188b1cf16e9d",
  ),
  "earthing-electrodes": unsplash("photo-1473341304170-971dccb5ac1e"),
  "earthing-backfill-compound": unsplash("photo-1500382017468-9049fed747ef"),
  "earthing-pit-covers": unsplash("photo-1497440001374-f26997328c1b"),
  "gi-earthing-strips": unsplash("photo-1565514020179-026b92b84bb6"),
  "power-transformers": unsplash("photo-1473341304170-971dccb5ac1e"),
  "distribution-transformers": unsplash("photo-1473341304170-971dccb5ac1e"),
  "isolation-transformer": unsplash("photo-1581092160562-40aa08e78837"),
  "pit-lighting-transformer": unsplash("photo-1497440001374-f26997328c1b"),
  "rectifier-transformer": unsplash("photo-1581092160562-40aa08e78837"),
  "power-transformer-repair": unsplash("photo-1581092160562-40aa08e78837"),
  "distribution-transformer-repairs": unsplash("photo-1581092160562-40aa08e78837"),
};
