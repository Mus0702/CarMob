package com.azoudmustafa.service.notification;

import com.azoudmustafa.model.Booking;
import com.azoudmustafa.repository.BookingRepository;
import com.azoudmustafa.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmailNotificationService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

  //@Scheduled(cron = "0 45 18 * * ?")
    public void sendRatingEmailsForPreviousDayTrips() {
       LocalDate currentDate = LocalDate.now();
        List<Booking> bookings = bookingRepository.findBookingsToNotify(currentDate);
        if(!bookings.isEmpty()){
            for(Booking booking:bookings){
                emailService.sendRatingEmail(
                        "azoud@hotmail.com",
                        "CarMob rating",
                        "Dear "+booking.getPassenger().getFirstname()+", thanks for choosing CarMob.\n What do you think about your experience with "+booking.getDriver().getFirstname()+"?\n You can rate him by clicking on the followed link : http://localhost:5173/rating/"+booking.getRoute().getId()
                        );
                booking.setIsNotified(true);
                bookingRepository.save(booking);
            }
        }


        emailService.sendRatingEmail("azoud@homail.com", "Notez votre trajet!", "saluut bébé");

    }
}

