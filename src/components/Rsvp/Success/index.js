import React, { useContext } from 'react';
import { RsvpContext } from '../index';
import { getFirstName } from '../../../util';

import styles from './Success.module.scss';

const Success = () => {
  const { guest, getGuestAttending } = useContext(RsvpContext);
  const attending = getGuestAttending(guest.id);
  const name = getFirstName(guest.name);

  return (
    <div className={styles.message}>
      {attending ? (
        <>
          <h3>Get your dancing pants ready</h3>
          <p className={styles.lede}><strong>Alright {name}, we've got you down as a&nbsp;yes.</strong></p>
          <p>
            Don't forget to mark your calendar for October 17th of this year! We can't wait to
            celebrate with you.
          </p>
        </>
      ) : (
        <>
          <h3>Say it ain't so!</h3>
        <p>
          Hey {name}, we're sorry you can't make it but thanks for letting us know. Hopefully we'll see you soon!
        </p>
        </>
      )}
    </div>
  );
};

export default Success;
