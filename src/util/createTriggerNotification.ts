import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

const createTriggerNotification = async ({
  id,
  title,
  body,
  date,
}: {
  id: string;
  title: string;
  body: string;
  date: Date;
}) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
};

export default createTriggerNotification;
