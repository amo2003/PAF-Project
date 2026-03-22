package backend.Module_2.Service;

import backend.Module_2.Model.Booking;
import backend.Module_2.Repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl {
    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    //convert booking entiy to reponse dto
    private BookingResponse toReponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getUserId(),
                booking.getResourceId(),
                booking.getBookingDate(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getPurpose(),
                booking.getAttendees(),
                booking.getStatus(),
                booking.getRejectionReason()
        );
    }

    @Override
    public BookingResponse createBooking(BookingRequest request) {
        //check sheduling conflict
        List<Booking> conflicts bookingRepository.findConflictingBookings(
                request.getResourceId(),
                request.getBookingDate(),
                request.getStartTime(),
                request.getEndTime()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Booking already exists");
        }

        Booking booking = new Booking(
                request.getUserId(),
                request.getResourceId(),
                request.getBookingDate(),
                request.getStartTime(),
                request.getEndTime(),
                request.getPurpose(),
                request.getAttendees(),
                BookingStatus.PENDING
        );

        return toReponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findBy(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        return toReponse(booking);
    }

    @Override
}
