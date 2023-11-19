const LastMonth = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100 dark:from-dark_green-100 dark:to-green-900-950 flex flex-col justify-center">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-2xl text-cyan-900 dark:text-cyan-100 font-bold md:text-4xl">
          In Last 30 days
        </h2>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow mx-auto">
      <div className="stat">
          <div className="stat-title">New Posts</div>
          <div className="stat-value">200+</div>
          <div className="stat-desc">↗︎ (50%)</div>
        </div>
        <div className="stat">
          <div className="stat-title">Reader&apos;s engagement</div>
          <div className="stat-value">20 hours</div>
          <div className="stat-desc">average per person per month</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">100+</div>
          <div className="stat-desc">↗︎ (80%)</div>
        </div>
      </div>
    </div>
  );
};

export default LastMonth;
