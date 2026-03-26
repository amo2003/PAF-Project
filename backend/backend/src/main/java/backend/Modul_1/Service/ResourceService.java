package backend.Modul_1.Service;

import backend.Modul_1.Model.Resource;
import backend.Modul_1.Repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public Resource create(Resource resource) {
        return resourceRepository.save(resource);
    }

    public List<Resource> getAll() {
        return resourceRepository.findAll();
    }

    public Resource getById(Long id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
    }

    public Resource update(Long id, Resource updated) {
        Resource r = getById(id);
        r.setName(updated.getName());
        r.setType(updated.getType());
        r.setCapacity(updated.getCapacity());
        r.setLocation(updated.getLocation());
        r.setStatus(updated.getStatus());
        return resourceRepository.save(r);
    }

    public void delete(Long id) {
        resourceRepository.deleteById(id);
    }
}
