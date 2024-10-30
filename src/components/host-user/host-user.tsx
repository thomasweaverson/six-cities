type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}
function HostUser({avatarUrl, id, isPro, name}: Host): JSX.Element {
  return (
    <div className="property__host-user user">
      <div className={`property__avatar-wrapper user__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro' : ''}`}>
        <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="property__user-name">
        {name}
      </span>
      {isPro && <span className="property__user-status">Pro</span>}
    </div>
  );
}

export default HostUser;
