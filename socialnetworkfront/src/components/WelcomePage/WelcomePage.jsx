import { Link } from 'react-router-dom';
import React from 'react';

const WelcomePage = () => {
  return (
    
    <div>

      <div style={{ display: 'none', fontSize: '1px', color: '#fefefe', lineHeight: '1px', fontFamily: 'Lato, Helvetica, Arial, sans-serif', maxHeight: '0px', maxWidth: '0px', opacity: '0', overflow: 'hidden' }}>
        We're thrilled to have you here! Get ready to dive into your new account.
      </div>
      <table style={{ border: '0', cellpadding: '0', cellspacing: '0', width: '100%' }}>
        <tr>
          <td bgcolor="#ADD8E6" align="center">
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: '600px' }}>
              <tr>
                <td align="center" valign="top" style={{ padding: '40px 10px 40px 10px' }}> </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ADD8E6" align="center" style={{ padding: '0px 10px 0px 10px' }}>
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: '600px' }}>
              <tr>
                <td bgcolor="#ffffff" align="center" valign="top" style={{ padding: '40px 20px 20px 20px', borderRadius: '4px 4px 0px 0px', color: '#111111', fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '48px', fontWeight: '400', letterSpacing: '4px', lineHeight: '48px' }}>
                  <h1 style={{ fontSize: '48px', fontWeight: '400', margin: '2' }}>Welcome!</h1>
                  <img src="https://img.icons8.com/clouds/100/000000/handshake.png" alt ="" width="125" height="120" style={{ display: 'block', border: '0px' }} />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ADD8E6" align="center" style={{ padding: '0px 10px 0px 10px' }}>
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: '600px' }}>
              <tr>
                <td bgcolor="#ffffff" align="left" style={{ padding: '20px 30px 40px 30px', color: '#666666', fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '25px' }}>
                  <p style={{ margin: '0' }}>We're excited to have you get started. Click below to go to login page.</p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="center" style={{ padding: '20px 30px 60px 30px' }}>
                        <table border="0" cellSpacing="0" cellPadding="0">
                          <tr>
                            <td align="center" style={{ borderRadius: '3px', backgroundColor: '#ADD8E6' }}>
                              <Link to="/" style={{ fontSize: '20px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#ffffff', textDecoration: 'none', padding: '15px 25px', borderRadius: '2px', border: '1px solid #DD8E6', display: 'inline-block' }}>
                                Log in!  </Link>
                              
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left" style={{ padding: '20px 30px 20px 30px', color: '#666666', fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '25px' }}>
                  <p style={{ margin: '0' }}>
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left" style={{ padding: '0px 30px 20px 30px', color: '#666666', fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '25px' }}>
                  <p style={{ margin: '0' }}>If you have any questions, just send us mail to: mail@gmail.com.</p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left" style={{ padding: '0px 30px 40px 30px', borderRadius: '0px 0px 4px 4px', color: '#666666', fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '25px' }}>
                  <p style={{ margin: '0' }}>Cheers,<br />Connect Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#f4f4f4" align="center" style={{ padding: '30px 10px 0px 10px' }}>
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: '600px' }}>
            </table>
          </td>
        </tr>
        <tr>
          {/* <td bgcolor="#f4f4f4" align="center" style={{ padding: '0px 10px 0px 10px' }}> */}
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: '600px' }}>
              <tr>
                <td bgcolor="#f4f4f4" align="left" style={{ padding: '0px 30px 30px 30px', color: '#666666', fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '18px' }}>
                  <br />
                
                </td>
              </tr>
            </table>
          {/* </td> */}
        </tr>
      </table>
    </div>
  );
};

export default WelcomePage;
