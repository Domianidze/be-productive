import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

const createTriggerNotification = async ({
  title,
  body,
  date,
}: {
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
      title: title,
      body: body,
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
