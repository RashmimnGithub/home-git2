import React from 'react';
// import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigateToURL = (url) => {
        window.location.href = url;
      };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };

  return (
    <div className="home-container">
        <main className="main">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </main>
        <header className="header">
            <h1>Welcome to netcon CMP</h1>
        </header>
        <br></br>
        <main className="next">
            {/* <h6>Networking</h6> */}
            <button className="nav-button networking" onClick={() => navigateToURL('https://aws.amazon.com/certification/certified-cloud-practitioner/?ch=sec&sec=rmg&d=1')}><p>Networking</p></button>
            <button className="nav-button ITSM" onClick={() => navigateToURL('https://www.atlassian.com/itsm#:~:text=IT%20service%20management%E2%80%94often%20referred,deliver%2C%20and%20support%20IT%20services.')}>ITSM</button>
            <button className="nav-button Automation" onClick={() => navigateToURL('https://www.ibm.com/topics/automation#:~:text=Automation%20is%20the%20application%20of,outcomes%20with%20minimal%20human%20input.')}>Automation</button>
        </main>
        <br></br>
        <main className="next">
            <button className="nav-button" onClick={() => navigateToURL('https://ap-southeast-2.console.aws.amazon.com/console/home?region=ap-southeast-2#')}>Reporting</button>
            <button className="nav-button" onClick={() => navigateToURL('https://portal.azure.com/?quickstart=true#home')}>FinOps</button>
            <button className="nav-button" onClick={() => navigateToURL('/home')}>Management</button>
        </main>
    </div>
  );
};

export default Logout;
