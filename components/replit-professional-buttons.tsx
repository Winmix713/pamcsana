const ReplitRunButton = () => (
  <button className="replit-button replit-button--run">
    <span>Run</span>
  </button>
)

const ReplitCodeButton = () => (
  <button className="replit-button replit-button--code">
    <span>Code</span>
  </button>
)

const ReplitDeployButton = () => (
  <button className="replit-button replit-button--deploy">
    <span>Deploy</span>
  </button>
)

const ReplitDebugButton = () => (
  <button className="replit-button replit-button--debug">
    <span>Debug</span>
  </button>
)

const ReplitDatabaseButton = () => (
  <button className="replit-button replit-button--database">
    <Database size={16} />
    <span>Database</span>
  </button>
)

export {
  ReplitRunButton,
  ReplitCodeButton,
  ReplitDeployButton,
  ReplitDebugButton,
  ReplitDatabaseButton
}