package backend.Module_2.Controller;


import backend.Module_2.Service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("http://localhost:3000")
public class BookingController {

    public final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // POST /api/bookings — User creates a booking request
    @PostMapping("/{id}")
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        BookingResponse response = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
