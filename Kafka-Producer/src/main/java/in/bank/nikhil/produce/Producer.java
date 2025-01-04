package in.bank.nikhil.produce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class Producer {

    // Use the KafkaTemplate to send data to topics
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    // Deposit topic name from application.properties
    @Value("${deposite.topic.name}")
    private String depositTopicName;

    public void sendMessage(String message) {
        kafkaTemplate.send(depositTopicName, message);
        System.out.println("Deposit message sent: " + message);
    }

    // Withdraw topic name from application.properties
    @Value("${withdraw.topic.name}")
    private String withdrawTopicName;

    public void sendWithDrawMessage(String message) {
        kafkaTemplate.send(withdrawTopicName, message);
        System.out.println("Withdraw message sent: " + message);
    }

    // User profile topic name from application.properties
    @Value("${profile.topic.name}")
    private String userProfileTopicName;

    public void sendUserProfileData(String message) {
        kafkaTemplate.send(userProfileTopicName, message);
        System.out.println("User profile message sent: " + message);
    }

    // Transfer data topic name from application.properties
    @Value("${transfer.topic.name}")
    private String transferTopicName;

    public void sendTransferData(String message) {
        kafkaTemplate.send(transferTopicName, message);
        System.out.println("Transfer message sent: " + message);
    }

    // Current account data topic name from application.properties
    @Value("${current.topic.name}")
    private String currentTopicName;

    public void sendCurrentData(String message) {
        kafkaTemplate.send(currentTopicName, message);
        System.out.println("Current account message sent: " + message);
    }

    // Saving account data topic name from application.properties
    @Value("${saving.topic.name}")
    private String savingTopicName;

    public void sendSavingData(String message) {
        kafkaTemplate.send(savingTopicName, message);
        System.out.println("Saving account message sent: " + message);
    }
}
