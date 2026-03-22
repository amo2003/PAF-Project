package backend.Module_2.Service;

import backend.Module_2.Repository.BookingRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl {
    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    //convert booking entiy to reponse dto
    private BookingResponse to
}
