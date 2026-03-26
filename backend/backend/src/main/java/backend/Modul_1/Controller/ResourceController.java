package backend.Modul_1.Controller;

import backend.Modul_1.Model.Resource;
import backend.Modul_1.Service.ResourceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin("http://localhost:3000")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    // POST /api/resources
    @PostMapping
    public ResponseEntity<Resource> create(@RequestBody Resource resource) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.create(resource));
    }

    // GET /api/resources
    @GetMapping
    public ResponseEntity<List<Resource>> getAll() {
        return ResponseEntity.ok(resourceService.getAll());
    }

    // GET /api/resources/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getById(@PathVariable Long id) {
        return ResponseEntity.ok(resourceService.getById(id));
    }

    // PUT /api/resources/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Resource> update(@PathVariable Long id, @RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.update(id, resource));
    }

    // DELETE /api/resources/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        resourceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
