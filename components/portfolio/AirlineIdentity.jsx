import { airlineForCallsign } from '@/lib/airlines.mjs';
import IdentityTile from './IdentityTile';

export default function AirlineIdentity({ callsign }) {
  const airline = airlineForCallsign(callsign);
  if (!airline) return null;

  return <p className="airspace-airline airspace-label airspace-muted">
    <IdentityTile src={airline.icon} />
    <span>{airline.name}</span>
  </p>;
}
